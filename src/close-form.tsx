import { Layout } from "./layout"
import { Select, Input } from "./form"

type CloseReason =
  | 'stop_activity'
  | 'prices_not_adequate'
  | 'missing_requirements'
  | 'app_unclear'
  | 'lack_of_demand'
  | 'other';

type ClosedDetail =
  | 'quality_issue'
  | 'outboarded'
  | 'churn'
  | 'eligibility_issue'
  | 'residence_permit_expired'
  | 'residence_permit_not_accepted'
  | 'never_worked'
  | 'onboarding_not_finished'
  | 'inactive'
  | 'duplicate'
  | 'no_show'
  | 'availability'
  | 'not_interested'
  | 'closed'
  | 'out_of_area'
  | 'suspected_fraud'
  | 'requested_by_pro'
  | 'childcare_recurring_unavailability'
  | 'childcare_september_unavailability'
  | 'no_diploma'
  | 'quiz_failed'
  | 'siren_issue'
  | CloseReason;

const closeReasons: CloseReason[] = [
    'stop_activity',
    'prices_not_adequate',
    'missing_requirements',
    'app_unclear',
    'lack_of_demand',
    'other',
  ];

const closedDetails: ClosedDetail[] = [
    'quality_issue',
    'outboarded',
    'churn',
    'eligibility_issue',
    'residence_permit_expired',
    'residence_permit_not_accepted',
    'never_worked',
    'onboarding_not_finished',
    'inactive',
    'duplicate',
    'no_show',
    'availability',
    'not_interested',
    'closed',
    'out_of_area',
    'suspected_fraud',
    'requested_by_pro',
    'childcare_recurring_unavailability',
    'childcare_september_unavailability',
    'no_diploma',
    'quiz_failed',
    'siren_issue',
    ...closeReasons, // Include CloseReason values
  ];

type CloseFormProps = {
    user: {
        user: string;
    }
}

export const CloseForm = ({ user }: CloseFormProps) => {
    return (
        <Layout country="FR">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-8">Close account: {user.user}</h1>
            <form action='/protected/close' method='post' class='flex flex-col gap-4'>
                <Select name="closed_detail" id="closed_detail" label="Closed detail">
                    {closedDetails.map((reason) => (
                        <option value={reason}>{reason}</option>
                    ))}
                </Select>
                <Input name="closed_comment" id="closed_comment" label="Comment" />
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-min">Valider</button>
            </form>
        </Layout>
    )
}