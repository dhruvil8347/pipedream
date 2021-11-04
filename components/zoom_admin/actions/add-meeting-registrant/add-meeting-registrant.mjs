import zoomAdmin from "../../zoom_admin.app.mjs";
import get from "lodash/get.js";
import { axios } from "@pipedream/platform";

export default {
  name: "Add meeting registrant",
  description: "Register a participant for a meeting. [See the docs here](https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingregistrantcreate)",
  key: "zoom-admin-action-add-meeting-registrant",
  version: "0.0.3",
  type: "action",
  props: {
    zoomAdmin,
    meetingId: {
      propDefinition: [
        zoomAdmin,
        "meetingId",
      ],
    },
    occurrenceId: {
      propDefinition: [
        zoomAdmin,
        "occurrenceId",
      ],
      description: "The [meeting occurrence ID](https://support.zoom.us/hc/en-us/articles/214973206-Scheduling-Recurring-Meetings).",
    },
    email: {
      type: "string",
      label: "Email",
      description: "A valid email address of the registrant",
    },
    firstName: {
      type: "string",
      label: "First Name",
      description: "Registrant's first name",
    },
    lastName: {
      type: "string",
      label: "Last Name",
      description: "Registrant's last name",
      optional: true,
    },
    address: {
      type: "string",
      label: "Address",
      description: "Registrant's address",
      optional: true,
    },
    city: {
      type: "string",
      label: "City",
      description: "Registrant's city",
      optional: true,
    },
    country: {
      propDefinition: [
        zoomAdmin,
        "country",
      ],
    },
    zip: {
      type: "string",
      label: "ZIP Code",
      description: "Registrant's Zip/Postal Code.",
      optional: true,
    },
    state: {
      type: "string",
      label: "State",
      description: "Registrant's State/Province.",
      optional: true,
    },
    phone: {
      type: "string",
      label: "Phone",
      description: "Registrant's Phone number.",
      optional: true,
    },
    industry: {
      type: "string",
      label: "Industry",
      description: "Registrant's Industry.",
      optional: true,
    },
    org: {
      type: "string",
      label: "Organization",
      description: "Registrant's Organization.",
      optional: true,
    },
    jobTitle: {
      type: "string",
      label: "Job Title",
      description: "Registrant's Job Title.",
      optional: true,
    },
    purchasingTimeFrame: {
      type: "string",
      label: "Purchasing Time Frame",
      description: "This field can be included to gauge interest of webinar attendees towards buying your product or service.",
      optional: true,
      options: [
        "Within a month",
        "1-3 months",
        "4-6 months",
        "More than 6 months",
        "No timeframe",
      ],
    },
    roleInPurchaseProcess: {
      type: "string",
      label: "Role in Purchase Process",
      description: "Role in Purchase Process.",
      optional: true,
      options: [
        "Decision Maker",
        "Evaluator/Recommender",
        "Influencer",
        "Not involved",
      ],
    },
    numberOfEmployees: {
      type: "string",
      label: "Number of Employees",
      description: "Number of Employees.",
      optional: true,
      options: [
        "1-20",
        "21-50",
        "51-100",
        "101-500",
        "501-1,000",
        "1,001-5,000",
        "5,001-10,000",
        "More than 10,000",
      ],
    },
    comments: {
      type: "string",
      label: "Comments",
      description: "A field that allows registrants to provide any questions or comments that they might have.",
      optional: true,
    },
    language: {
      type: "string",
      label: "Language",
      description: "Registrant's language preference for confirmation emails.",
      optional: true,
      options: [
        "en-US",
        "de-DE",
        "es-ES",
        "fr-FR",
        "jp-JP",
        "pt-PT",
        "ru-RU",
        "zh-CN",
        "zh-TW",
        "ko-KO",
        "it-IT",
        "vi-VN",
      ],
    },
    autoApprove: {
      type: "boolean",
      label: "Auto Approve",
      description: "Registrant's auto-approve.",
      optional: true,
    },
  },
  async run ({ $ }) {
    const res = await axios($, this.zoomAdmin._getAxiosParams({
      method: "POST",
      path: `/meetings/${get(this.meetingId, "value", this.meetingId)}/registrants`,
      data: {
        email: this.email,
        first_name: this.firstName,
        last_name: this.lastName,
        address: this.address,
        city: this.city,
        country: this.country,
        zip: this.zip,
        state: this.state,
        phone: this.phone,
        industry: this.industry,
        org: this.org,
        job_title: this.jobTitle,
        purchasing_time_frame: this.purchasingTimeFrame,
        role_in_purchase_process: this.roleInPurchaseProcess,
        number_of_employees: this.numberOfEmployees,
        comments: this.comments,
        language: this.language,
        auto_approve: this.autoApprove,
      },
    }));

    $.export("$summary", `"${this.firstName}" was successfully invited to the meeting "${get(this.meetingId, "label", this.meetingId)}"`);

    return res;
  },
};
