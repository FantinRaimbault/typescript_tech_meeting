export type User = {
    id: string;
    name: string;
    age: number;
    /** 
     * relations
    */
    teamId: string
}

export type Team = {
    id: string;
    name: string;
}

export type Sponsor = {
    id: string;
    name: string;
    /** 
     * relations
    */
    teamId: string
}

export type Dog = {
    id: string;
    name: string;

    /** 
     * relations
    */
    userId: string
}

export type VirtualUser = {
    team: Team;
    dogs: Dog[];
}

export type VirtualTeam = {
    sponsors: Sponsor[]
}
