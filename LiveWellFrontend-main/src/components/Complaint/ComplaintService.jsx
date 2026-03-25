import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:3000/api/people';
const token = JSON.parse(localStorage.getItem('token'));

export const ComplaintService = {

    async fetchComplaints() {
        console.log('Error updating complaint status:');
        try {
            const response = await axios.get(`${API_BASE_URL}/complaints`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching complaints:', error);
            toast.error('Failed to load complaints');
            throw error;
        }
    },

    async updateComplaintStatus(complaintId, status, ownerRemark) {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/complaints/${complaintId}`,
                { status, ownerRemark }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating complaint status:', error);
            toast.error('Failed to update complaint status');
            throw error;
        }
    }
};