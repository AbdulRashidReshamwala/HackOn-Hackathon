import nltk
from nameparser.parser import HumanName
from nltk.corpus import wordnet
import re
from nltk.corpus import stopwords


def get_human_names(text):
    person_list = []
    person_names = person_list
    tokens = nltk.tokenize.word_tokenize(text)
    pos = nltk.pos_tag(tokens)
    sentt = nltk.ne_chunk(pos, binary=False)

    person = []
    name = ""
    for subtree in sentt.subtrees(filter=lambda t: t.label() == 'PERSON'):
        for leaf in subtree.leaves():
            person.append(leaf[0])
        if len(person) > 1:
            for part in person:
                name += part + ' '
            if name[:-1] not in person_list:
                person_list.append(name[:-1])
            name = ''
        person = []
    return person_list


def extract_phone_numbers(text):
    r = re.compile(
        r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})')
    phone_numbers = r.findall(text)
    return [re.sub(r'\D', '', number) for number in phone_numbers]


def extract_email_addresses(text):
    r = re.compile(r'[\w\.-]+@[\w\.-]+')
    return r.findall(text)


def extract_all(text):
    names = get_human_names(text)
    emails = extract_email_addresses(text)
    numbers = extract_phone_numbers(text)
    print('names', names)
    print(emails)
    print(numbers)
    name = ''.join(names)
    email = ''.join(emails)
    number = ''.join(numbers)
    final_string = ' '.join("" if i in name else i for i in text.split())
    final_string = ' '.join(
        "" if i in email else i for i in final_string.split())
    final_string = ' '.join(
        "" if i in number else i for i in final_string.split())
    # print(final_string)
    # print(len(final_string))
    return final_string
