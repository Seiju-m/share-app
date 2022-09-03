export interface Todo {
    title: string;
    selected: boolean;
    checked: any[];
    id: string;
    type: string;
    date: Date;

    list: Array<any>;
}
