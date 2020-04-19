from PIL import Image, ImageFilter


def Blur(path, regions):
    image = Image.open(path)

    for region in regions:
        x = region['x']
        y = region['y']
        w = region['width']
        h = region['height']

        x1 = int(x*(image.width/100))
        y1 = int(y*(image.height/100))
        x2 = int((x+w)*(image.width/100))
        y2 = int((y+h)*(image.height/100))
    # image.show()
        cropped_image = image.crop((x1, y1, x2, y2))
        blurred_image = cropped_image.filter(
            ImageFilter.GaussianBlur(radius=10))
        image.paste(blurred_image, (x1, y1, x2, y2))
    # image.show()
    image.save(path)


api_key = '16cbfc5a-6d63-4bf0-a5d0-bd2403ae6db8'


def extract_info(path, x, y, w, h):
    img = Blur(path, x, y, w, h)
    text = OCR(img)
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
    print(dict_obj)
    return dict_obj


if __name__ == "__main__":
    extract_info('CreatedReport2.JPG', 0, 0, 100, 38)
