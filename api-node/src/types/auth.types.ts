export interface Fields {
    name: string;
    tableID: number;
    columnID: number;
    dataTypeID: number;
    dataTypeSize: number;
    dataTypeModifier: number;
    format: string;
}

export interface IKnexRaw {
    command: string;
    rowCount: number;
    oid: number;
    rows: any[];
    fields: Fields[];
}

export type refreshParams = {
    ip: string;
    user_agent: string;
    token: string;
    expiron: string;
    user_id: string;
};
