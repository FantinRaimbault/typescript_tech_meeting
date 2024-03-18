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
  // TODO
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
    // TODO
};

type Result2 = DeepOverwriteValues<User, 'typescript'>;
