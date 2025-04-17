export type TTeacher = {
    name: string;
    email: string;
    phone: string;
    photo: string;
    designation: string;
    subject: string;
    qualifications: string;
    status: 'Active' | 'Inactive';
    isBlock : boolean
}
