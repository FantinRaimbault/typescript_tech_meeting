type PrimitiveTypes = string | number | boolean | Date;

/**
 * Exo 2 - A : DeepPath
 * instruction: Create a type DeepPath that takes a generic MyObject and returns a new type
 * where all the values of MyObject are replaced by a string representing the path to this value
 * Example:
 * type Result = DeepPath<User>
 * // Result = "age" | "name" | "hobbies" | "address" | "address.city" | "address.postalCode"
 */
type DeepPath<MyObject> = MyObject extends object
  ? {
      [Key in keyof MyObject]: Key extends string
        ? MyObject[Key] extends PrimitiveTypes
          ? `${Key}`
          : `${Key}` | `${Key}.${DeepPath<MyObject[Key]>}`
        : never;
    }[keyof MyObject]
  : never;

/**
 * Exo 2 - B : GetValueFromPath
 * instruction: Create a type GetValueFromPath that takes a generic MyObj, a generic Str and a generic Sep
 * and returns a new type where the value of MyObj at the path Str is returned
 * Example:
 * type Result = GetValueFromPath<User, "address.city", ".">
 * // Result = string
 */
type GetValueFromPath<MyObj, Str, Sep> = Str extends string
? Sep extends string
  ? Str extends `${infer BS}${Sep}${infer Rest}`
    ? BS extends keyof MyObj
      ? GetValueFromPath<MyObj[BS], Rest, Sep>
      : never
    : Str extends keyof MyObj
      ? MyObj[Str]
      : never
  : never
: never;

const obj = {
  a: {
    b: {
      c: 'my string',
      e: new Date(),
      z: {
        y: {
          toto: 'ok',
          tutu: new Date(),
        },
      },
    },
  },
  d: true,
};

/**
 * Exo 2 - C : getValueFromPath function
 * instruction: Use your types to create a function 
 * getValueFromPath that takes an object and a path and returns the value at this path
 * tips: use Generics getValueFromPath<...>
 */
function getValueFromPath<Obj, Path extends DeepPath<Obj>>(obj: Obj, path: Path) {
    const paths = path.split('.');
    let objTemp = { ...obj };
    for (const p of paths) {
      objTemp = objTemp[p];
    }
    return objTemp as GetValueFromPath<Obj, Path, '.'>;
  }

const value = getValueFromPath(obj, 'a.b.z.y');
