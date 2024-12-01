import { INPUT_PATH, runner } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const cardSortVal: Record<string, number> = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
};

// Part 1
runner({
  path,
  solution: input => {
    const cards: string[] = [];
    const values: number[] = [];
    const enum Type {
      Five = 7,
      Four = 6,
      Full = 5,
      Three = 4,
      TwoPair = 3,
      OnePair = 2,
      High = 1,
    }
    // const valueMap: Record<string, string> = {
    //   [Type.Five]: 'five',
    //   [Type.Four]: 'Four',
    //   [Type.Full]: 'Full',
    //   [Type.Three]: 'Three',
    //   [Type.TwoPair]: 'TwoPair',
    //   [Type.OnePair]: 'OnePair',
    //   [Type.High]: 'High',
    // };

    input
      .split('\n')
      .filter(Boolean)
      .forEach(line => {
        const [card, value] = line.split(' ');
        cards.push(card);
        values.push(Number(value));
      });

    const checkCards = (cards: string[]) => {
      const map = new Map<string, number>();

      for (const card of cards) {
        map.set(card, (map.get(card) || 0) + 1);
      }

      if (map.size === 1) return Type.Five;
      if (map.size === 5) return Type.High;

      for (const val of map.values()) {
        if (map.size === 3 && val === 3) return Type.Three;
        if (map.size === 4 && val === 2) return Type.OnePair;
        if (map.size === 2 && (val === 3 || val === 2)) return Type.Full;
        if (map.size === 2 && val === 4) return Type.Four;
        if (map.size === 3 && val === 2) return Type.TwoPair;
      }
    };

    return cards
      .map((card, index) => {
        const value = checkCards(card.split('')) || 0;
        // console.log(card, valueMap[value]);
        return {
          value,
          card,
          bid: values[index],
        };
      })
      .sort((a, b) => {
        if (a.value === b.value) {
          for (let i = 0; i < a.card.length; i++) {
            if (a.card[i] === b.card[i]) continue;

            return cardSortVal[a.card[i]] - cardSortVal[b.card[i]];
          }
        }

        return a.value - b.value;
      })
      .reduce((acc, cur, i) => acc + cur.bid * (i + 1), 0);
  },
});
