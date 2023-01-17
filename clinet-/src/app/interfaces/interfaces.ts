export interface login {
    email: string;
    password: string;
    type: string;
}


export interface offer {

}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        email: string;
        type: string;
        token: string;
    }
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
        email: string;
        type: string;
        token: string;
    }
}

export interface OfferCreate {
    title: string;
    description: string;
    domain: string;
    salary?: number;
    educationLevel: EDUCAION_LEVEL; 
    localisation: Localisation;
}

export interface EDUCAION_LEVEL {
    id: number;
    name: string;
}

export interface Localisation {
    id: number;
    name: string;
}


export interface AuthState {
    isAuthenticated: boolean;
    who: string;
    isExpired: boolean;
}

export interface Offer {
    uid: string;
    title: string;
    domain: string;
    salary: string;
    education_level: string;
    status: string;
    location: string;
    views: number;
    description: string;
}

export interface OffersResponse {
    success: boolean;
    message: string;
    data: {
        content: Offer[];
    }
}
export interface OfferResponse {
    success: boolean;
    message: string;
    data: {
        content: Offer;
    }
}

export interface CreateOffer {
    title: string;
    description: string;
    domain: string;
    salary?: string;
    education_level: string;
    location: string;
}

export interface Job {
    id: number;
    uid: string;
    title: string;
    description: string;
    domain: string;
    salary: string;
    education_level: string;
    status: string;
    location: string;
    views: number;
    company: Company;
}

export interface Company {
    id: number;
    uid: string;
    name: string;
    email: string;
    phoneNo: string;
    address: string;
    imageUri: string;
    description: string;
    role: string;
    enabled: boolean;
    authorities: Authority[];
    username: string;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
}

interface Authority {
    authority: string;
}

export interface JobResponse {
    success: boolean;
    message: string;
    data: {
        content: Job[];
    }
}

export interface JobOneResponse {
    success: boolean;
    message: string;
    data: Job;
}

