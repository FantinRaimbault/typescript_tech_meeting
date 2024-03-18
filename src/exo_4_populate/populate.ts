import { User, VirtualUser } from './db_models/models';
import { VirtualsGetter } from './helpers/virtual-getter';

// Given the following types:
export type AppPopulateOption<Virtual> = RestrictedPopulateOptions<
  Virtual,
  keyof Virtual
>[];

export type RestrictedPopulateOptions<
  Virtual,
  Paths extends keyof Virtual,
> = Paths extends infer Path
  ? {
      path: Paths;
      populate?: Path extends keyof Virtual
        ? Virtual[Path] extends Array<infer TypeOfTheArray>
          ? RestrictedPopulateOptions<
              VirtualsGetter<TypeOfTheArray>,
              keyof VirtualsGetter<TypeOfTheArray>
            >[]
          : RestrictedPopulateOptions<
              VirtualsGetter<Virtual[Path]>,
              keyof VirtualsGetter<Virtual[Path]>
            >[]
        : never;
    }
  : never;
// end of given types

/**
 * Exo 4 - A : PopulateResult
 * instruction: Create a type PopulateResult that takes a generic Model, a generic Virtual and a generic PopulateOption
 * and returns a new type where all options specified in PopulateOption will build a new type
 * Example:
 * type Result = PopulateResult<User, VirtualUser, [{ path: 'team', populate: [{ path: 'sponsors' }] }, { path: 'dogs' }]>
 * // Result = User & {
 * //   team: Team & {
 * //     sponsors: Sponsor[];
 * //   };
 * //   dogs: Dog[];
 * // }
 */
type PopulateResult<
  Model,
  Virtual,
  PopulateOption extends AppPopulateOption<Virtual>, // = [{path: string, populate: [{path, populate: ...Recursive... }]}]
> = Model & {
  
};

type Result = PopulateResult<
  User,
  VirtualUser,
  [
    {
      path: 'team';
      populate: [
        {
          path: 'sponsors';
        },
      ];
    },
    {
        path: 'dogs'
    }
  ]
>;
