import { AxiosInstance } from 'axios'

export type Callback = (curlResult: {command: string}, error: any) => void;

declare function _default(instance: AxiosInstance, callback?: Callback): void;
export default _default;