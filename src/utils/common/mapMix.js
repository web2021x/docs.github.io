import { ref, onMounted } from 'vue';
export function mapMixin() {
    const mixinData = ref('This is mixin data');
    function mixinMethod() {
        console.log('Mixin method called');
        console.log(mapCon.value);
    }
    onMounted(() => {
        console.log('Mixin created hook called');
    });

    return {
        mixinData,
        mixinMethod
    };
}

