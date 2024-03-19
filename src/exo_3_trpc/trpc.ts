const blogController = {
  controllerName: 'blogs',
  methods: {
    getAll() {
      return [{ id: '1', name: '', borrowingDate: '' }];
    },
    create(createPost: { name; borrowingDate }) {
      return { id: '1', name: '', borrowingDate: createPost.borrowingDate };
    },
    deleteOne() {
      return 12;
    },
  },
} as const;

const postController = {
  controllerName: 'posts',
  methods: {
    findOne() {
      return [{ id: '1', name: '', borrowingDate: '' }];
    },
    create(createPost: { name; borrowingDate }) {
      return { id: '1', name: '', borrowingDate: createPost.borrowingDate };
    },
    updateOne() {
      return 12;
    },
  },
} as const;

/**
 * Exo 3 - A : trpc
 * instruction: Create a type ExtractControllerMethods that takes a generic ObjController
 * and returns a new type where all the methods of ObjController are extracted
 * Example:
 * type Result = ExtractControllerMethods<typeof blogController>
 * // Result = {
 * //   getAll: () => { id: string; name: string; borrowingDate: string; }[];
 * //   create: (createPost: { name; borrowingDate: string; }) => { id: string; name: string; borrowingDate: string; };
 * //   deleteOne: () => number;
 * // }
 */
type ExtractControllerMethods<ObjController> = ObjController extends {
  methods: object;
}
  ? {
      // TODO
    }
  : never;

/**
 * Exo 3 - B : trpc
 * instruction: Create a type Trpc that takes a generic Controllers
 * and returns a new type where all the methods of Controllers are contained in a single object with the controllerName as key
 * Example:
 * type Result = Trpc<[typeof blogController, typeof postController]>
 * // Result = {
 * //   blogs: {
 * //     getAll: () => { id: string; name: string; borrowingDate: string; }[];
 * //     create: (createPost: { name; borrowingDate: string; }) => { id: string; name: string; borrowingDate: string; };
 * //     deleteOne: () => number;
 * //   };
 * //   posts: {
 * //     findOne: () => { id: string; name: string; borrowingDate: string; }[];
 * //     create: (createPost: { name; borrowingDate: string; }) => { id: string; name: string; borrowingDate: string; };
 * //     updateOne: () => number;
 * //   };
 * // }
 */
type Trpc<Controllers extends Array<any>> = {};

function trpc<Controllers extends Array<any>>(
  controllers: Controllers,
): Trpc<Controllers> {
  return controllers.reduce((acc, controller) => {
    if (controller.controllerName) {
      acc[controller.controllerName] = controller.methods;
      // acc[controller.controllerName] = fetch(method, input)
    }
    return acc;
  }, {}) as Trpc<Controllers>;
}

const trpcInstance = trpc([blogController, postController]);
