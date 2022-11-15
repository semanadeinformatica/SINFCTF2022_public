courses = ['algebra', 'amat1', 'fsc', 'mdis', 'fpro', 'pup', 'amat2', 'fisica1', 'ac', 'tcom', 'prog', 'aeda', 'bdad', 'fisica2',
           'sope', 'ldts', 'lcom', 'da', 'esof', 'mest', 'ltw', 'ipc', 'lbaw', 'rcom', 'fsi', 'pfl', 'cpd', 'comp', 'cgra', 'pi', 'iart']


def encrypt(sentence):
    res = ""
    max_offset = len(courses)
    for i in sentence:
        i = i.lower()
        offset = ord(i) - ord('a')
        if offset < 0 or offset > max_offset:
            res += i
        else:
            res += courses[offset]
        if i != ' ':
            res += " "
    return res


chat = ["im really angry... i think that the project is stupid",
        "why do you say that?",
        "i would like to be able to compile multiple files",
        "thats a bit overkill",
        "no... i would even put SINFCTF2022{qUiTeS3mPlElittledictatorchatbelike} in a hidden file",
        "still think youre trying too hard..."]

speakers = ['SCOOTER: ', 'BROCCOLI: ']
for i in range(len(chat)):
    print(f'{speakers[i % 2]} {encrypt(chat[i])}')
