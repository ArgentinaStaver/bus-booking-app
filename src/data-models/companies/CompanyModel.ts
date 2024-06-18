import { CountryModel } from "../country/CountryModel";
import { CommissionType, CompanyType } from "../types/CompanyTypes";

export interface CompanyModel {
    id: string;
    name: string;
    phone: string;
    email: string;
    cui: string;
    address: string;
    country: CountryModel;
    commission: number;
    commissionType: CommissionType;
    companyType: CompanyType;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}
