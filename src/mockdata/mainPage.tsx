export const keywordList = ['ไอ', 'ไอแบบมีเสมหะ', 'ไอเป็นเลือด', 'ไอแห้ง', 'ไข้', 'หอบ', 'คัดจมูก', 'ตาแดง']

interface Diagnosis {
    diagnosis: string;
    probability: string;
    keyword: {
        [key: string]: string,
    };
}

export const diagnosisList: Array<Diagnosis> = [
    {
        diagnosis: 'กกกกกกกกกกก',
        probability: '80.00%',
        keyword: {
            a: 'inactiveeeeee',
            b: 'inactive',
            c: 'inactive',
        }
    }, {
        diagnosis: 'ขขขขขขขขขขข',
        probability: '75.00%',
        keyword: {
            a: 'inactive',
            b: 'inactive',
            c: 'inactive',
        }
    }, {
        diagnosis: 'คคคคคคคคคคคคคคคค',
        probability: '75.00%',
        keyword: {
            a: 'inactive',
            b: 'inactive',
            c: 'inactive',
        }
    }, {
        diagnosis: 'งงงงงงงงงง',
        probability: '60.50%',
        keyword: {
            a: 'inactive',
            b: 'inactive',
            c: 'inactive',
        }
    }
]