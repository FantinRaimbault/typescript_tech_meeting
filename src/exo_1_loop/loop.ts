type PrimitiveTypes = string | number | boolean | Date;

type User = {
  age: number;
  name: string;
  hobbies: string[];
  address: {
    city: string;
    postalCode: string;
  };
};

/**
 * Exo 1 - A : OverwriteValues
 * instruction: Create a type OverwriteValues that takes two generics MyType and MyValue
 * and returns a new type where all the values of MyType are replaced by MyValue
 */
type OverwriteValues<MyType, MyValue> = {
  [K in keyof MyType]: MyValue;
};

type Result = OverwriteValues<User, 'typescript'>;

/**
 * Exo 1 - B : DeepOverwriteValues
 * instruction: Create a type DeepOverwriteValues that takes two generics MyType and MyValue
 * and returns a new type where all the values of MyType are replaced by MyValue
 * if a value is an object, all properties of this object are replaced by MyValue
 * if a value is an array, all elements of this array are replaced by MyValue
 */
type DeepOverwriteValues<MyType, MyValue> = {
  [K in keyof MyType]: MyType[K] extends PrimitiveTypes
    ? MyValue
    : MyType[K] extends Array<any>
      ? MyValue[]
      : MyType[K] extends object
        ? DeepOverwriteValues<MyType[K], MyValue>
        : never;
};

type Result2 = DeepOverwriteValues<User, 'typescript'>;
