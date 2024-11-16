// это data-классы
//вообще по хорошему все надо на TS перевести, но пока не будем, ждем бэк

export class Exercise {
    constructor({
                    id = +new Date(),
                    name = '',
                    shortName = '',
                    description = '',
                    parts = []
                } = {}) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.description = description;
        this.parts = [...parts];

    }

    getMaxHits(){
        let max = 0;
        for(let part of this.parts){
            if (part instanceof Train){
                if (max < part.hitsRange){
                    max = part.hitsRange;
                }
            }
        }
        return max;
    }

    getMaxEnergy(){
        let max = 0;
        for(let part of this.parts){
            if (part instanceof Train){
                const energy = part.getEnergy();
                if (max < energy){
                    max = energy;
                }
            }
        }
        return max;
    }
}


const MAX_HITS = 10000;

export class Train {
    _id = +new Date();
    static fieldsDictionary = {
        hitsRange: 'Количество ударов',
        trainType: 'Тип тренировки',
        hand: "Рука",
        target: "Мишень",
        ringBefore: "Кольцо до",
        ringAfter: "Кольцо после",
        swing: "Замах",
        speed: "Скорость", //или число (если null, то Н/Д)
        delay: "Задержка",
    }

    static types = {
        trainType: ["Базовая", 'Силовая', 'Контроль скорости', "FTP"],
        hand: ['Правая', "Левая"],
        target: ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "0", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9",],
        hitsRange: 'NUMBER',
        ringBefore: 'NUMBER',
        ringAfter: 'NUMBER',
        swing: 'NUMBER',
        speed: 'NUMBER',
        delay: 'NUMBER',
    }

    hitsRange = 100;
    trainType = Train.types.trainType[0];

    hand = Train.types.hand[0];
    target = Train.types.target[0];

    ringBefore = 30;
    ringAfter = 20;
    swing = 16;
    speed = 0.6//или число (если null, то Н/Д)
    delay = 1.5;

    constructor({
                    trainType = Train.types.trainType[0],
                    hitsRange = 100,
                    hand = Train.types.hand[0],
                    target = Train.types.target[0],
                    ringBefore = 30,
                    ringAfter = 20,
                    swing = 16,
                    delay = 1.5,
                    speed = 0.6,
                } = {}) {
        switch (trainType) {
            case 'Силовая':
            case "Контроль скорости":
                this.hitsRange = hitsRange ?? 100;
                this.trainType = trainType;
                this.hand = hand;
                this.target = target;
                this.ringBefore = ringBefore;
                this.ringAfter = ringAfter;
                this.swing = swing;
                this.delay = delay;
                this.speed = trainType === 'Силовая' ? 1 : 0.4;
                break;

            case 'FTP':
                this.hitsRange = MAX_HITS;
                this.trainType = trainType;
                this.hand = hand;
                this.target = target;
                this.ringBefore = ringBefore;
                this.ringAfter = ringAfter;
                this.swing = swing;
                this.speed = 1;
                this.delay = 0;
                break;

            case 'Базовая':
                this.hitsRange = hitsRange ?? 100;
                this.trainType = trainType;
                this.hand = hand;
                this.target = target;
                this.ringBefore = ringBefore;
                this.ringAfter = ringAfter;
                this.swing = swing;
                this.speed = speed ?? 0.6;
                this.delay = delay;
                break;
        }
    }

    getEnergy() {
        return Math.round((this.hitsRange * this.speed ** 2) / 2);
    }
}

export class Pause {

    _id = +new Date();
    static types = {
        pause: null,
        pauseTime: "NUMBER",
        hand: undefined,
        target: undefined,
        ringBefore: undefined,
        ringAfter: undefined,
        swing: undefined,
        speed: undefined,
        delay: undefined,
    }

    pause = "Пауза";
    pauseTime = 10;
    hand = undefined;
    target = undefined;
    ringBefore = undefined;
    ringAfter = undefined;
    swing = undefined;
    speed = undefined; //или число (если null, то Н/Д)
    delay = undefined;

    constructor({pause = 'Пауза', pauseTime = 10} = {}) {
        this.pause = pause;
        this.pauseTime = pauseTime;
    }
}

// значения полей (для выпадающих списков)
const exercises = [
    [
        {
            "hits": 100,
            "energy": 18
        },
        {
            "hits": 1999,
            "energy": 360
        },
        {
            "hits": 2220,
            "energy": 400
        },
        {
            "hits": 3000,
            "energy": 540
        },
        {
            "hits": 4000,
            "energy": 720
        },
        {
            "hits": 10000,
            "energy": 5000
        },
        {
            "hits": 5000,
            "energy": 400
        },
        {
            "hits": 5500,
            "energy": 990
        },
        {
            "hits": 5800,
            "energy": 464
        },
        {
            "hits": 8000,
            "energy": 1440
        },
        {
            "hits": 9000,
            "energy": 1620
        },
        {
            "hits": 9900,
            "energy": 1782
        },
        {
            "hits": 9990,
            "energy": 1798
        }
    ],

]