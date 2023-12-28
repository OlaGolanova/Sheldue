import { useHttp } from "../hooks/http.hook";
import { IAppointment, ActiveAppointment } from "../shared/interfaces/appointment.interface";
import { hasRequiredFields } from "../utils/hasRequiredFields";

const requiredFields = ['id', 'date', 'name', 'servise', 'phone', 'canceled']
const useAppointmentServise = () => {
    const {loadingStatus, request} = useHttp();

    const _apiBase = 'http://localhost:0=3001/appointment';
    const getAllAppointments = async (): Promise<IAppointment[]> => {
        const res = await request({url: _apiBase });
        if (res.every((item: IAppointment) => hasRequiredFields(item, requiredFields))) {
            return res;
        } else {
            throw new Error("Data doesnt have all the fields")
        }
    }

    const getAllActiveAppointments = async () => {
        const base = await getAllAppointments();
        const transformed: ActiveAppointment[] = base.map((item) => {
            return {
                id: item.id,
                date: item.date,
                name: item.name,
                service: item.service,
                phone: item.phone,
            }
        })

        return transformed;
    }

    return {loadingStatus, getAllAppointments, getAllActiveAppointments}
}



