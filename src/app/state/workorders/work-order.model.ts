import { guid, ID } from "@datorama/akita";
import { WorkOrderPriority } from "../models/workorderpriority";
import { WorkOrderStatus } from "../models/workorderstatus";

export interface WorkOrder {
  id: ID;
  name: string;
  description: string;
  createdBy: ID;
  createdDate: Date;
  closedBy: ID;
  closedDate: Date;
  responsibility: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  code: WorkOrderCode;
}

export function createWorkOrder(params: Partial<WorkOrder>) {
  const id = params?.id;
  return {
    id,
    name: "WO-" + id,
    description: "Fix Technical Issues",
    createdBy: null,
    createdDate: new Date(),
    closedBy: null,
    closedDate: new Date(),
    responsibility: null,
    status: WorkOrderStatus.OPEN,
    priority: WorkOrderPriority.NORMAL,
    code: null,
    ...params,
  } as WorkOrder;
}

export interface WorkOrderCode {
  id: ID;
  code: number;
  description: string;
}

export function createWorkOrderCode(params: Partial<WorkOrderCode>) {
  const id = params?.id;
  const description = params?.description || "Work Order Code";
  return {
    id,
    code: +id,
    description,
  } as WorkOrderCode;
}
