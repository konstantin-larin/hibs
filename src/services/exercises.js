// это data-классы
//вообще по хорошему все надо на TS перевести, но пока не будем, ждем бэк

export class Exercise{
    id = new Date();
    name = '';
    shortName = '';
    description = '';
    parts = []; //состоят из ExerciseCompositionPart
    constructor() {}
}

export class Train {
    hitsRange = 100;
    trainType = trainTypes[0];
    hand = hands[0];
    target = targets[0];
    ringBefore = 30;
    ringAfter = 20;
    swing = 16;
    speed = null; //или число (если null, то Н/Д)
    delay = 1.5;
}
export class ExercisePause{
    pause = 10;
}

// значения полей (для выпадающих списков)
export const trainTypes = ['Силовая', 'Кардио'];
export const hands = ['Правая', "Левая"];
export const targets = ["L1", "L2", "R1", "R2"];

