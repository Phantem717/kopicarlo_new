// types.ts
export interface CheckApiKeyResponse {
  status: boolean;
  data: {
    x_api_key: string;
  };
}

export interface HospitalDetail {
  name: string;
  phone: string;
  media_path: string;
  address: string;
  description: string;
  apoteker: string;
  logo_media_path: string;
  sipa: string;
}

export interface GetDetailHospitalResponse {
  status: boolean;
  data: HospitalDetail;
}

export interface RunningTextItem {
  id: string | number;
  text: string;
}

export interface RunningTextItemResponse {
  status: boolean;
  data: RunningTextItem[];
}

export interface SubFacilityQueue {
  id: number;
  name: string;
  facility_name: string;
  code: string;
  queue: [];
  is_hold: boolean;
}

export interface CounterItem {
  facility_name: string;
  sub_facility_name: string;
  is_executive: string;
  counter_name: string;
  queue_served: string;
  payment_option: string;
  default_queue_type: number;
  last_updated: string;
}

export interface CurrentCounterItem {
  any_queue_code: boolean;
  counter_name: string;
  default_queue_type: number;
  facility_name: string;
  is_executive: number;
  last_updated: string;
  payment_option: string;
  queue_served: string;
  sub_facility_name: string;
  doctor_name: string;
  room_name: string;
}

export interface Facility {
  tv_display_name: string;
  location: string;
  facility_id: any;
  facility_name: string;
  last_updated: string;
  current_counter: CurrentCounterItem[];
  counter: CounterItem[];
  sub_facility_queue: NextQueueItem[];
  current_called: any[];
  detail: QueueDetailDoctor[];
}

export interface FacilityResponse {
  status: boolean;
  message: string;
  data: Facility;
}

export interface NextQueueItem {
  id: number;
  name: string;
  facility_name: string;
  code: any;
  queue: [];
  is_hold: boolean;
}

export interface ServingCounterItem {
  facility_name: string;
  sub_facility_name: string;
  is_executive: string;
  counter_name: string;
  queue_served: string;
  payment_option: string;
  default_queue_type: number;
  last_updated: string;
}

export interface QueueData {
  current_counter: string;
  current_number: string;
  facility_name: string;
  next_queues: NextQueueItem[];
  serving_counters: ServingCounterItem[];
  running_text: string[]; // array teks biasa
}

export interface QueueResponse {
  status: boolean;
  data: {
    current_counter: any[];
    counter: ServingCounterItem[];
    sub_facility_queue: NextQueueItem[];
    running_text: string[];
    last_updated: string;
    tv_display_name: string;
  };
}
export interface RunningTextResponse {
  status: boolean;
  data: RunningTextItem[];
}

export interface QueueDetailDoctor {
  doctor_name: string;
  doctor_schedule_id: number;
  speciality: string;
  polyclinic_name: string;
  is_executive: number;
  room_id: number;
  room_name: string;
  doctor_schedule: string;
  detail_schedule: string;
  remarks: string;
  session_status: string;
  current_queue_number: string;
  current_queue_status: string;
  next_queue_number: string;
  next_queue_status: string;
  skip_queue: string[];
  total_queue: string;
}

export interface QueueDetailDoctorResponse {
  status: boolean;
  data: Facility;
}

export interface MediaPromotion {
  url: string;
  type: string;
}

export interface AdminResponse {
  apiKey: CheckApiKeyResponse;
  detailHospital: GetDetailHospitalResponse;
}
