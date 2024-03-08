<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()

authStore.setAuth('', { email: '', name: '', id: '' })
router.replace('/')

</script>