import { Team, User, VirtualTeam, VirtualUser } from '../db_models/models';

type IsExact<TYPE, EXPECTED> = TYPE extends EXPECTED
  ? EXPECTED extends TYPE
    ? true
    : false
  : false;
type If<CONDITION extends boolean, THEN, ELSE = never> = CONDITION extends true
  ? THEN
  : ELSE;

export type VirtualsGetter<TYPE_OF_THE_MODEL> = If<
  IsExact<TYPE_OF_THE_MODEL, User>,
  VirtualUser,
  If<IsExact<TYPE_OF_THE_MODEL, Team>, VirtualTeam, unknown>
>;
