class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

export class HashMap {
  constructor() {
    this.bucketsSize = 16;
    this.buckets = new Array(this.bucketsSize).fill(null);
    this.loadFactor = 0.75;
  }

  load() {
    const length = this.length();

    if (length / this.buckets.length >= this.loadFactor) {
      this.bucketsSize = this.bucketsSize * 2;
      const oldArr = [...this.buckets];
      this.buckets = oldArr.concat(new Array(this.bucketsSize).fill(null));
    }

    return length;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.buckets.length;
  }

  set(key, value) {
    const hash = this.hash(key);

    if (!this.has(key)) {
      const newNode = new Node(key, value);

      if (this.buckets[hash] == null) {
        this.buckets[hash] = newNode;
      } else {
        let node = this.buckets[hash];
        while (node.next != null) {
          node = node.next;
        }
        node.next = newNode;
      }
    } else {
      let node = this.buckets[hash];
      while (node != null && node.key != key) {
        node = node.next;
      }
      if (node != null) node.value = value;
    }

    this.load();
  }

  get(key) {
    if (!this.has(key)) return null;

    const hash = this.hash(key);
    let node = this.buckets[hash];
    while (node.key != null && node.key != key) {
      node = node.next;
    }
    return node.value;
  }

  has(key) {
    const hash = this.hash(key);
    let node = this.buckets[hash];

    while (node != null) {
      if (node.key == key) return true;
      node = node.next;
    }

    return false;
  }

  remove(key) {
    if (!this.has(key)) return false;

    const hash = this.hash(key);
    let node = this.buckets[hash];
    let prev = null;

    while (node.key != null && node.key != key) {
      prev = node;
      node = node.next;
    }

    if (prev == null && node.next == null) {
      // Remove node if it has no successor
      this.buckets[hash] = node.next;
    } else if (prev == null) {
      // Remove node if it has successor
      this.buckets[hash] = node.next;
    } else {
      // Remove node and connect next
      prev.next = node.next;
    }

    return true;
  }

  length() {
    let count = 0;
    this.buckets.forEach((node) => {
      let curr = node;
      if (curr != null) {
        count += 1;
        while (curr.next != null) {
          count += 1;
          curr = curr.next;
        }
      }
    });
    return count;
  }

  clear() {
    this.buckets.fill(null);
  }

  keys() {
    let keys = [];

    this.buckets.forEach((node) => {
      let curr = node;
      if (curr != null) {
        keys.push(curr.key);
        while (curr.next != null) {
          keys.push(curr.key);
          curr = curr.next;
        }
      }
    });

    return keys;
  }

  values() {
    let keys = [];

    this.buckets.forEach((node) => {
      let curr = node;
      if (curr != null) {
        keys.push(curr.value);
        while (curr.next != null) {
          keys.push(curr.value);
          curr = curr.next;
        }
      }
    });

    return keys;
  }

  entries() {
    let keys = [];

    this.buckets.forEach((node) => {
      let curr = node;
      if (curr != null) {
        keys.push([curr.key, curr.value]);
        while (curr.next != null) {
          keys.push([curr.key, curr.value]);
          curr = curr.next;
        }
      }
    });

    return keys;
  }
}
