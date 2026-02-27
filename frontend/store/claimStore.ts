import { create } from 'zustand'

export type ClaimStatus =
    | 'idle'
    | 'uploading'
    | 'preprocessing'
    | 'detecting'
    | 'estimating'
    | 'complete'
    | 'failed'

export type ApprovalStatus = 'pre_approved' | 'manual_review' | 'flagged_fraud'

export interface Detection {
    part: string
    severity: 'low' | 'medium' | 'high'
    confidence: number
    bbox: { x1: number; y1: number; x2: number; y2: number }
    part_cost: number
    labor_cost: number
    total_cost: number
}

export interface CostSummary {
    parts_total: number
    labour_total: number
    grand_total: number
}

export interface ClaimResult {
    claim_id: string
    status: ClaimStatus
    processing_time_ms: number
    vehicle_reg: string
    policy_number: string
    approval_status: ApprovalStatus
    approval_threshold: number
    image_url: string
    detections: Detection[]
    cost_summary: CostSummary
    ai_explanation: string
    fraud_flags: string[]
    created_at: string
}

interface ClaimStore {
    // Upload state
    claimId: string | null
    status: ClaimStatus
    uploadedImage: File | null
    previewUrl: string | null
    vehicleReg: string
    policyNumber: string
    contactEmail: string

    // Result state
    result: ClaimResult | null

    // Actions
    setClaimId: (id: string) => void
    setStatus: (status: ClaimStatus) => void
    setUploadedImage: (file: File | null) => void
    setPreviewUrl: (url: string | null) => void
    setVehicleReg: (val: string) => void
    setPolicyNumber: (val: string) => void
    setContactEmail: (val: string) => void
    setResult: (result: ClaimResult) => void
    reset: () => void
}

const initialState = {
    claimId: null,
    status: 'idle' as ClaimStatus,
    uploadedImage: null,
    previewUrl: null,
    vehicleReg: '',
    policyNumber: '',
    contactEmail: '',
    result: null,
}

export const useClaimStore = create<ClaimStore>((set) => ({
    ...initialState,
    setClaimId: (id) => set({ claimId: id }),
    setStatus: (status) => set({ status }),
    setUploadedImage: (file) => set({ uploadedImage: file }),
    setPreviewUrl: (url) => set({ previewUrl: url }),
    setVehicleReg: (vehicleReg) => set({ vehicleReg }),
    setPolicyNumber: (policyNumber) => set({ policyNumber }),
    setContactEmail: (contactEmail) => set({ contactEmail }),
    setResult: (result) => set({ result }),
    reset: () => set(initialState),
}))
