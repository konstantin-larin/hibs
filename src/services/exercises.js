// это data-классы
//вообще по хорошему все надо на TS перевести, но пока не будем, ждем бэк

export class Exercise{
    id = new Date();
    name = '';
    shortName = '';
    description = '';
    parts = []; //состоят из ExerciseCompositionPart
    constructor(exercise = null) {
        if(exercise instanceof Exercise){
            this.id = exercise.id;
            this.name = exercise.name;
            this.shortName = exercise.shortName;
            this.description = exercise.description;
            this.parts = [...exercise.parts];
        }
    }
}

export class Train {
    static fieldsDictionary = {
        hitsRange: 'Диапазон ударов',
        trainType: 'Тип тренировки',
        hand : "Рука",
        target : "Мишень",
        ringBefore : "Кольцо до",
        ringAfter : "Кольцо после",
        swing : "Замах",
        speed : "Скорость", //или число (если null, то Н/Д)
        delay : "Задержка",
    }

    static types = {
        trainType: ['Силовая', 'Кардио'],
        hand :['Правая', "Левая"],
        target: ["L1", "L2", "R1", "R2"],
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
}
export class Pause {
    static types = {
        pause: null,
        pauseTime: "NUMBER",
        hand :undefined,
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