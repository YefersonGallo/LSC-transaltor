const labelMap = {
    1: {name: 'a', color: 'red'},
    2: {name: 'b', color: 'yellow'},
    3: {name: 'c', color: 'green'},
    4: {name: 'd', color: 'blue'},
    5: {name: 'e', color: 'cyan'},
    6: {name: 'f', color: 'lime'},
    7: {name: 'i', color: 'tomato'},
    8: {name: 'k', color: 'gold'},
    9: {name: 'l', color: 'greenyellow'},
    10: {name: 'm', color: 'violet'},
    11: {name: 'n', color: 'pink'},
    12: {name: 'o', color: 'blueviolet'},
    13: {name: 'p', color: 'greenyellow'},
    14: {name: 'q', color: 'indigo'},
    15: {name: 'r', color: 'olive'},
    16: {name: 't', color: 'orange'},
    17: {name: 'u', color: 'palegreen'},
    18: {name: 'v', color: 'purple'},
    19: {name: 'w', color: 'salmon'},
    20: {name: 'x', color: 'sienna'},
    21: {name: 'y', color: 'antiquewhite'},
}


export const recognizeWord = (boxes, classes, scores, threshold, imgWidth, imgHeight, setText, setCant, word)=>{
    for(let i=0; i <= boxes.length; i++) {
        if(boxes[i] && classes[i] && scores[i] > threshold) {
            const text = classes[i]
            setText(prevText => {
                if(prevText === labelMap[text]['name']) {
                    if(word === labelMap[text]['name']) setCant(prevState => prevState + 1)
                } else {
                    setCant(0);
                }
                return labelMap[text]['name']
            })
        }
    }
}

export const generateWord = (boxes, classes, scores, threshold, imgWidth, imgHeight, setText, setCant)=>{
    for(let i=0; i <= boxes.length; i++) {
        if(boxes[i] && classes[i] && scores[i] > threshold) {
            const text = classes[i]
            setText(prevText => {
                if(prevText === labelMap[text]['name']) {
                    setCant(prevState => prevState + 1)
                } else {
                    setCant(0);
                }
                return labelMap[text]['name']
            })
        }
    }
}
