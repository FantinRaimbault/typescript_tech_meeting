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
  [Opt in PopulateOption[number] as Opt['path']]: Opt['path'] extends keyof Virtual
    ? // check if field *team* is an array and extract the type Team thx to infer keyword
      Virtual[Opt['path']] extends Array<infer TypeOfTheArray>
      ? // Then we check if we have a populate option field
        Opt['populate'] extends Array<any>
        ? // If yes, we call recursively PopulateResult with the type of the array and the populate option
          TypeOfTheArray &
            PopulateResult<
              TypeOfTheArray,
              VirtualsGetter<TypeOfTheArray>,
              Opt['populate']
            >
        : // If no, we return the type of the array with [], note: we could use Virtual[Opt['path']] instead of TypeOfTheArray[]
          TypeOfTheArray[]
      : // If *team* is not an array, we check if we have a populate option field and call recursively PopulateResult (same as above)
        Opt['populate'] extends Array<any>
        ? Virtual[Opt['path']] &
            PopulateResult<
              Virtual[Opt['path']],
              VirtualsGetter<Virtual[Opt['path']]>,
              Opt['populate']
            >
        : // If no, we return the type of the field
          Virtual[Opt['path']]
    : never;
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
      path: 'dogs';
    },
  ]
>;
