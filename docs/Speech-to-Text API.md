---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Speech-to-Text API

This page outlines the fundamentals of using the Speech-to-Text API. Covered in this page is information on the 
types of requests you can make using Speech-to-Text, how to construct those requests, and how to handle their 
responses. It's recommended that you read this page in its entirety before diving into the Speech API.

**Speech Requests**

Speech-to-Text has two main methods of performing speech recognition. These are listed and described as follows:

#### Synchronous Requests

With synchronous requests (REST), audio data is sent to the Speech-to-Text API, recognition is performed on that
 data, and results are returned once all audio has been processed. Synchronous recognition requests are limited 
to audio data of 1 minute or less in duration.

#### Asynchronous Requests

With asynchronous requests (REST), audio data is sent to the Speech-to-Text API and a Long Running Operation is 
initiated. Using this operation, you can periodically poll for recognition results. Asynchronous requests can be used 
for audio data with a duration up to 400 minutes.


|Request Type | Audio Length Limit |
| ------------- | ------------- |
| Synchronous Request  | `≤ 60 seconds` | 
| Asynchronous Request  | `≤ 400 minutes` |


**Supported formats**

* `File Type` - We currently only support **wav, amr, flac, and ogg.** audio files.

* `Sample Rate` - We support all sample rates between 8 000 Hz and 48 000 Hz. If you can choose the sample rate of the source, record the audio at 16 000 Hz. This is because sample rates below that might affect the accuracy of our models, and sample rates above 16 000 Hz have no significant impact on the accuracy of our models. 


# Speech-to-Text API

### Synchronous Request

Synchronous recognition requests are the simplest means of performing recognition on speech audio data. 
The Speech-to-Text API can process up to 1 minute of speech audio data sent in a synchronous request. 
After the Speech-to-Text API processes and recognizes all of the audio, it returns a response. A sample 
request is shown in the section that follows:


**ASR POST**

```bash
https://api.botlhale.xyz/asr
```
:::tip
You need to include an Authentication Token in request headers. See the Authentication 
page of this documentation for information on how to generate authentication token codes.
:::

This endpoint handles single speech-to-text conversion. This API endpoint returns a text transcript of the audio file provided and supports audio clips of up to 1 minutes.


Request Params |File Type | | Description |
| ------------- | ------------- | ------------- | ------------- |
| SpeechFile  | `File`  | **Required** | This is the binary audio file of the user's message.| 
| SampleRate  | `Number`  | **Required** | The sample rate of the supplied audio clip in hertz, for example, 8kHz rendered as 8 000.|
| LanguageCode  | `String`  | **Optional** | This is the language spoken in the supplied audio clip. We use BCP-47 language tags. <br/>See the Supported Languages page for a list of supported languages and codes. |



**Request Example**

<Tabs>
<TabItem value="py" label="Python" default>

```py
import requests

url = "https://api-dev.botlhale.xyz/asr"

payload = {'LanguageCode': 'zu-ZA',
'SampleRate': '16000'}
files=[
  ('SpeechFile',('tts_aw215n3s4ni4_IsiZulu_H127Bqf8aN08.wav',open('0zanOkguS/tts_aw215n3s4ni4_IsiZulu_H127Bqf8aN08.wav','rb'),'audio/wav'))
]
headers = {}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)

```

</TabItem>
<TabItem value="bash" label="Bash">

```js 
curl --location 'https://api-dev.botlhale.xyz/asr' \
--form 'LanguageCode="zu-ZA"' \
--form 'SampleRate="16000"' \
--form 'SpeechFile=@"0zanOkguS/tts_aw215n3s4ni4_IsiZulu_H127Bqf8aN08.wav"'
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const formdata = new FormData();
formdata.append("LanguageCode", "zu-ZA");
formdata.append("SampleRate", "16000");
formdata.append("SpeechFile", fileInput.files[0], "[PROXY]");

const requestOptions = {
  method: "POST",
  body: formdata,
  redirect: "follow"
};

fetch("https://api-dev.botlhale.xyz/asr", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem>
<TabItem value="nodejs" label="NodeJs - Request">

```js
var request = require('request');
var fs = require('fs');
var options = {
  'method': 'POST',
  'url': 'https://api-dev.botlhale.xyz/asr',
  'headers': {
  },
  formData: {
    'LanguageCode': 'zu-ZA',
    'SampleRate': '16000',
    'SpeechFile': [
      fs.createReadStream('0zanOkguS/tts_aw215n3s4ni4_IsiZulu_H127Bqf8aN08.wav')
    ]
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

</TabItem>
</Tabs>


**Response body**

```json
{
    "DateReceived": "09/03/2023 11:21:07",
    "LanguageCode": "zu-ZA",
    "NewSampleRate": "16000",
    "SpeechFile": "asr_6fFd2s7974WO_zu-ZA__w7P2MS4FH454.wav",
    "Transcription": "izithombe zakhe umzimba zokuxhumana"
}
```



### Asynchronous Request

Asynchronous recognition requests are another means of performing recognition on speech audio data. This request 
type requires you to first upload the audio file to our server for the asynchronous process to start. The asynchronous request initiates an asynchronous operation and returns this operation immediately. Asynchronous speech recognition can be used for audio data with a length of up to 400 minutes.

#### ASR Async upload POST

```bash
https://api.botlhale.xyz/asr/async/upload
```
:::tip
You need to include an Authentication Token in request headers. See the [Authentication](https://docs.botlhale.xyz/docs/APIs/Authentication/#generate-a-bearer-token-post) page of this documentation for information on how to generate authentication token codes.
:::

This endpoint generates a presigned URL that allows the user to upload a speech file for the async ASR request. This endpoint returns a presigned URL and the auto-generated filename.

| Request Params | File Type | | Description |
| ------------- | ------------- | ------------- | ------------- |
| OrgID  | `String`  | **Required** |Organisation ID |
| SampleRate  | `Number`  | **Required** |The sample rate of the supplied audio clip in hertz, for example, 8kHz rendered as 8 000|
| LanguageCode  | `String`  | **Optional** |This is the language spoken in the supplied audio clip. We use BCP-47 language tags. <br/>See the Supported Languages page for a list of supported languages and codes. If this information is not provided, the language is automatically detected. This is done at sentence level.|
| Diarization | `Boolean`  |**Optional** | Speaker diarization is used to identify the different speakers in an audio clip, as well as when the different speakers are speaking. Valid values are as follows: <br/>_**False** - Default, Speaker diarization is disabled._ <br/>_**True** - Speaker diarization is enabled._|

**Request Example**

<Tabs>
<TabItem value="py" label="Python" default>

```py
import requests

url = "https://api-dev.botlhale.xyz/asr/async/upload"

payload = {'SampleRate': '16000',
'Diarization': 'True'}
files=[

]
headers = {}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)

```

</TabItem>
<TabItem value="bash" label="Bash" >

```js 
curl --location 'https://api-dev.botlhale.xyz/asr/async/upload' \
--form 'SampleRate="16000"' \
--form 'Diarization="True"'
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const formdata = new FormData();
formdata.append("SampleRate", "16000");
formdata.append("Diarization", "True");

const requestOptions = {
  method: "POST",
  body: formdata,
  redirect: "follow"
};

fetch("https://api-dev.botlhale.xyz/asr/async/upload", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem>
<TabItem value="nodejs" label="Node JS - Request">

```js
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://api-dev.botlhale.xyz/asr/async/upload',
  'headers': {
  },
  formData: {
    'SampleRate': '16000',
    'Diarization': 'True'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

</TabItem>
</Tabs>


**Response body**


```json
{
    "fields": {
        "AWSAccessKeyId": "<AWSAccessKeyId>",
        "key": "asr_h1754Le80Gun__16000_1_7Pf1jL54um46.wav",
        "policy": "<policy>",
        "signature": "<signature>",
        "x-amz-security-token": "<x-amz-security-token>"
    },
    "url": "<url>"
}
```


**Upload via Presigned URL**

The generated presigned URL includes both a URL and additional fields that must be passed as part of the subsequent `HTTP POST` request. The following code demonstrates how to use the requests package with a presigned POST URL to perform a `POST` request for file upload.

**Request Example**

<Tabs>
<TabItem value="py" label="Python" default>

```py
import requests

url = "{{uploadUrl}}"

payload = {'AWSAccessKeyId': '{{fields-AWSAccessKeyId}}',
'key': '{{fields-key}}',
'policy': '{{fields-policy}}',
'signature': '{{fields-signature}}',
'x-amz-security-token': '{{fields-x-amz-security-token}}'}
files=[
  ('file',('tts_aw215n3s4ni4_IsiZulu_H127Bqf8aN08.wav',open('KpALthHva/tts_aw215n3s4ni4_IsiZulu_H127Bqf8aN08.wav','rb'),'audio/wav'))
]
headers = {}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)

```

</TabItem>
<TabItem value="nodejs" label="NodeJs - Request" >

```js 
var request = require('request');
var fs = require('fs');
var options = {
  'method': 'POST',
  'url': '{{uploadUrl}}',
  'headers': {
  },
  formData: {
    'AWSAccessKeyId': '{{fields-AWSAccessKeyId}}',
    'key': '{{fields-key}}',
    'policy': '{{fields-policy}}',
    'signature': '{{fields-signature}}',
    'x-amz-security-token': '{{fields-x-amz-security-token}}',
    'file': [
      fs.createReadStream('KpALthHva/tts_aw215n3s4ni4_IsiZulu_H127Bqf8aN08.wav')
    ]
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});


```

</TabItem>
</Tabs>


#### ASR Async get status GET

```bash
https://api.botlhale.xyz/asr/async/status
```
 
 :::tip
> You need to include an `Authentication Token` in request headers. See the [Authentication](https://docs.botlhale.xyz/docs/APIs/Rest%20APIs/Speech%20APIs/1%20-%20Authentication.md#generate-a-bearer-token-post) page of this documentation for information on how to generate authentication token codes.
:::

This endpoint returns the status of the asynchronous request process.

Request Params | Data Type | |Description
| ------------- | ------------- | ------------- | ------------- |
| OrgID  | `String`  | **Required** |Organisation ID |
| FileName  | `Text` | **Required** |The filename generated from the async upload process. |


**Request Example**

<Tabs>
<TabItem value="py" label="Python" default>

```py
import requests

url = "https://api.botlhale.xyz/asr/async/status?OrgID=<OrgID>&FileName=<filename>"

payload={

  }

files=[

]

headers = {
  'Authorization': 'Bearer <IdToken>'
}

response = requests.request("GET", url, headers=headers, data=payload, files=files)

print(response.json())
```

</TabItem>
<TabItem value="bash" label="Bash" >

```js 
curl --location --request GET 'https://api.botlhale.xyz/asr/async/status?OrgID=<OrgID>&FileName=<filename>' \
--header 'Authorization: Bearer <IdToken>' 
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer <IdToken>");

var formdata = new FormData();

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://api.botlhale.xyz/asr/async/status?OrgID=<OrgID>&FileName=<filename>", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

</TabItem>
<TabItem value="nodejs" label="Node JS - Request">

```js
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.botlhale.xyz/asr/async/status?OrgID=<OrgID>&FileName=<filename>',
  'headers': {
    'Authorization': 'Bearer <IdToken>'
  },
  formData: {

  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```

</TabItem>
</Tabs>


**Response body**

```json
{
    "data": [
        {
            "OrgID": "<OrgID>",
            "id": 207891841473145364,
            "process": "<filename>.wav",
            "processTime": "processTime",
            "status": "running"
        }
    ]
}
```
<br />



#### ASR Async get data GET
```bash
https://api.botlhale.xyz/asr/async/data
```

:::tip
> You need to include an `Authentication Token` in request headers. See the [Authentication](https://docs.botlhale.xyz/docs/APIs/Rest%20APIs/Speech%20APIs/1%20-%20Authentication.md#generate-a-bearer-token-post) page of this documentation for information on how to generate authentication token codes.
:::

This endpoint returns the status of the async process.

| Request Params | Data Type | | Description |
| ------------- | ------------- | ------------- | ------------- |
| OrgID  | `String`  |**Required** |Organisation ID |
| FileName  | `Text` |**Required** |The filename generated from the async upload process |


**Request Example**

<Tabs>
<TabItem value="py" label="Python" default>

```py
import requests

url = "https://api.botlhale.xyz/asr/async/getdata?OrgID=<OrgID>&FileName=<filename>"

payload={

  }

files=[

]

headers = {
  'Authorization': 'Bearer <IdToken>'
}

response = requests.request("GET", url, headers=headers, data=payload, files=files)

print(response.json())
```

</TabItem>
<TabItem value="bash" label="Bash" >

```js 
curl --location --request GET 'https://api.botlhale.xyz/asr/async/getdata?OrgID=<OrgID>&FileName=<filename>' \
--header 'Authorization: Bearer <IdToken>' 
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer <IdToken>");

var formdata = new FormData();

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://api.botlhale.xyz/asr/async/getdata?OrgID=<OrgID>&FileName=<filename>", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

</TabItem>
<TabItem value="nodejs" label="Node JS - Request">

```js
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.botlhale.xyz/asr/async/getdata?OrgID=<OrgID>&FileName=<filename>',
  'headers': {
    'Authorization': 'Bearer <IdToken>'
  },
  formData: {

  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```

</TabItem>
</Tabs>


**Response body**
 
```json
{
    "audio_length": "30.0",
    "filename": "/<filename>.wav",
    "status": "complete",
    "time": {
        "diarization": 6.815945625305176,
        "recognition": 4.098539113998413
    },
    "timestamps": [
        {
            "end": 1260.0000000000005,
            "filename": "1_speaker_0_660.0000000000003_1260.0000000000005_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_0",
            "start": 660.0000000000003,
            "transcription": "<transcription>"
        },
        {
            "end": 2310.0000000000014,
            "filename": "2_speaker_1_1260.000000000001_2310.0000000000014_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_1",
            "start": 1260.000000000001,
            "transcription": "<transcription>"
        },
        {
            "end": 2699.9999999999995,
            "filename": "3_speaker_0_2309.9999999999995_2699.9999999999995_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_0",
            "start": 2309.9999999999995,
            "transcription": "<transcription>"
        },
        {
            "end": 6359.999999999998,
            "filename": "4_speaker_1_2699.9999999999973_6359.999999999998_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_1",
            "start": 2699.9999999999973,
            "transcription": "<transcription>"
        },
        {
            "end": 6780.000000000008,
            "filename": "5_speaker_0_6360.000000000008_6780.000000000008_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_0",
            "start": 6360.000000000008,
            "transcription": "<transcription>"
        },
        {
            "end": 7860.000000000012,
            "filename": "6_speaker_1_6780.000000000012_7860.000000000012_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_1",
            "start": 6780.000000000012,
            "transcription": "<transcription>"
        },
        {
            "end": 8580.000000000022,
            "filename": "7_speaker_0_7860.000000000021_8580.000000000022_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_0",
            "start": 7860.000000000021,
            "transcription": "<transcription>"
        },
        {
            "end": 13950.000000000011,
            "filename": "8_speaker_1_8580.00000000001_13950.000000000011_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_1",
            "start": 8580.00000000001,
            "transcription": "<transcription>"
        },
        {
            "end": 15239.999999999889,
            "filename": "9_speaker_1_14249.999999999887_15239.999999999889_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_1",
            "start": 14249.999999999887,
            "transcription": "<transcription>"
        },
        {
            "end": 15929.999999999867,
            "filename": "10_speaker_0_15239.999999999867_15929.999999999867_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_0",
            "start": 15239.999999999867,
            "transcription": "<transcription>"
        },
        {
            "end": 18629.999999999854,
            "filename": "11_speaker_1_15929.999999999853_18629.999999999854_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_1",
            "start": 15929.999999999853,
            "transcription": "<transcription>"
        },
        {
            "end": 19739.99999999995,
            "filename": "12_speaker_0_18629.99999999995_19739.99999999995_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_0",
            "start": 18629.99999999995,
            "transcription": "<transcription>"
        },
        {
            "end": 21839.999999999993,
            "filename": "13_speaker_1_19739.999999999993_21839.999999999993_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_1",
            "start": 19739.999999999993,
            "transcription": "<transcription>"
        },
        {
            "end": 22410.000000000073,
            "filename": "14_speaker_0_21840.00000000007_22410.000000000073_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_0",
            "start": 21840.00000000007,
            "transcription": "<transcription>"
        },
        {
            "end": 24360.00000000009,
            "filename": "15_speaker_1_22410.00000000009_24360.00000000009_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_1",
            "start": 22410.00000000009,
            "transcription": "<transcription>"
        },
        {
            "end": 25590.000000000167,
            "filename": "16_speaker_0_24360.000000000167_25590.000000000167_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_0",
            "start": 24360.000000000167,
            "transcription": "<transcription>"
        },
        {
            "end": 26430.000000000215,
            "filename": "17_speaker_1_25590.000000000215_26430.000000000215_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_1",
            "start": 25590.000000000215,
            "transcription": "<transcription>"
        },
        {
            "end": 28380.000000000244,
            "filename": "18_speaker_0_26430.000000000244_28380.000000000244_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_0",
            "start": 26430.000000000244,
            "transcription": "<transcription>"
        },
        {
            "end": 29220.00000000032,
            "filename": "19_speaker_1_28380.00000000032_29220.00000000032_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_1",
            "start": 28380.00000000032,
            "transcription": "transcription"
        },
        {
            "end": 30000.000000000353,
            "filename": "20_speaker_0_29220.00000000035_30000.000000000353_nso-ZA.wav",
            "language": "nso-ZA",
            "speaker": "speaker_0",
            "start": 29220.00000000035,
            "transcription": "<transcription>"
        }
    ]
}
```
<br />

## Contact us

:::info
We are here to help! Please [contact us](mailto:support@botlhale.ai) with any questions.
:::