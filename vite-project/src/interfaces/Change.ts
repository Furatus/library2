interface Change {
    id: string;
    kind: string;
    timestamp: string;
    comment: string;
    changes: { key: string; revision: number }[];
    author: { key: string };
    ip: string | null;
    data: { [key: string]: any };
}

export default Change