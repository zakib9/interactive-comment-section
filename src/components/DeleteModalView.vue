<template>
    <Teleport to="body">
     
         <div v-show="modalActive" class="absolute w-full bg-black bg-opacity-30 h-full
         top-0 left-0 flex justify-center">
           
               <div v-if="modalActive" class="p-8 bg-white m-auto max-w-96 rounded-lg flex flex-col justify-center">
                   
                   <h3 class="font-bold text-2xl">Delete Comment</h3>
                   <p class="text-gray-500 text-lg mt-2">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                   
                   <div class="flex gap-4">
                       <button @click="emitIds(false)" class="text-white mt-8 bg-gray-500 p-4 rounded-md">NO, CANCEL</button>
                       <button @click="emitIds(true)" class="text-white mt-8 bg-[#ED6368] p-4 rounded-md">YES, DELETE</button>
                   </div>
               </div>
           
         </div>
     
 </Teleport>
</template>

<script setup>
const emit = defineEmits(['closeModal'])
defineProps({
       modalActive : {
           type: Boolean,
           default: false,
       },
       accept : {
           type: Boolean,
           default: null,
       }
       
   })

   function emitIds(accept){
        emit('closeModal', accept)
   }
</script>