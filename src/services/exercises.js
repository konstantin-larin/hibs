// это data-классы
//вообще по хорошему все надо на TS перевести, но пока не будем, ждем бэк

export class Exercise {
    id = new Date();
    name = '';
    shortName = '';
    description = '';
    parts = []; //состоят из ExerciseCompositionPart
    constructor(exercise = null) {
        if (exercise instanceof Exercise) {
            this.id = exercise.id;
            this.name = exercise.name;
            this.shortName = exercise.shortName;
            this.description = exercise.description;
            this.parts = [...exercise.parts];
        }
    }
}

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
        trainType: ["Базовая", 'Силовая', 'Контроль скорости',"FTP"],
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
    speed = 0; //или число (если null, то Н/Д)
    delay = 1.5;

    constructor(train = null) {
        if (train instanceof Train) {
            const trainType = train.trainType;
            switch (trainType) {
                case 'Силовая':
                case "Контроль скорости":
                    this.hitsRange = train.hitsRange ?? 100;
                    this.trainType = train.trainType;
                    this.hand = train.hand;
                    this.target = train.target;
                    this.ringBefore = train.ringBefore;
                    this.ringAfter = train.ringAfter;
                    this.swing = train.swing;
                    this.speed = null;
                    this.delay = train.delay;
                    break;

                case 'FTP':
                    this.hitsRange = null;
                    this.trainType = train.trainType;
                    this.hand = train.hand;
                    this.target = train.target;
                    this.ringBefore = train.ringBefore;
                    this.ringAfter = train.ringAfter;
                    this.swing = train.swing;
                    this.speed = null;
                    this.delay = 0;
                    break;

                case 'Базовая':
                    this.hitsRange = train.hitsRange ?? 100;
                    this.trainType = train.trainType;
                    this.hand = train.hand;
                    this.target = train.target;
                    this.ringBefore = train.ringBefore;
                    this.ringAfter = train.ringAfter;
                    this.swing = train.swing;
                    this.speed = train.speed ?? 0;
                    this.delay = train.delay;
                    break;
            }
        }
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
}

// значения полей (для выпадающих списков)
