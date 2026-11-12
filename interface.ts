export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    tel: string;
    role: "admin" | "member";
}

export interface LoginUser {
    id: string;
    name: string;
    email: string;
    role: "admin" | "member";
    token: string;
}

export interface ServiceItem {
    _id: string;
    name: string;
    description: string;
    estimatedDuration: number;
    serviceFee: number;
}

export interface AppointmentItem {
    _id: string;
    user: UserProfile;
    service: ServiceItem;
    brand: string;
    model: string;
    registrationNumber: string;
    appointmentDate: string;
    startTime: string;
    durationMinutes: number;
}

export interface ServiceInput {
    name: string;
    description: string;
    estimatedDuration: number;
    serviceFee: number;
}

export interface AppointmentInput {
    service: string;
    registrationNumber: string;
    brand: string;
    model: string;
    appointmentDate: string;
    startTime: string;
}

export interface RegistrationInput {
    name: string;
    email: string;
    tel: string;
    password: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}
