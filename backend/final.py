import cloudmersive_ocr_api_client
from cloudmersive_ocr_api_client.rest import ApiException
import requests

api_key = '16cbfc5a-6d63-4bf0-a5d0-bd2403ae6db8'


def OCR(file_path):
    api_instance = cloudmersive_ocr_api_client.ImageOcrApi()
    image_file = str(file_path)
    api_instance.api_client.configuration.api_key = {}
    api_instance.api_client.configuration.api_key['Apikey'] = api_key
    try:
        api_response = api_instance.image_ocr_post(image_file)
        a = ' '
        r = a.join(api_response.to_dict()['text_result'].split('\n'))
        return r
    except ApiException as e:
        print("Exception when calling ImageOcrApi->image_ocr_post: %s\n" % e)


def query_raw(text, url="https://bern.korea.ac.kr/plain"):
    return requests.post(url, data={'sample_text': text}).json()


def extract_info(path):
    text = OCR(path)
    a = query_raw(text)
    dict_obj = {'Disease': [], 'Drug': []}
    length = len(a['denotations'])
    for span in range(length):
        # print(a['denotations'][span]['span'])
        dis = a['denotations'][span]['obj']
        begend = a['denotations'][span]['span']
        # print(dis)
        # print(meshid)
        word = text[begend['begin']: begend['end'] + 1]
        if dis[1] == 'i':
            meshid = a['denotations'][span]['id'][0][5:]
            if meshid[0] == 'D':
                dict_obj['Disease'].append([word, meshid])
        else:
            meshid = a['denotations'][span]['id'][0][6:]
            dict_obj['Drug'].append([word, meshid])
    return dict_obj, text
