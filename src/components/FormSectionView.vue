<template>
    <div class="w-full mt-2 bg-white rounded-lg  mx-auto p-8 flex gap-4">
        <img class="h-10 w-10" 
        src="..\assets\images\avatars\image-juliusomo.png" alt="">
        

        <textarea 
        v-model="comment"  
        placeholder="Add a comment..." 
        class="block w-full rounded-lg border border-solid py-1.5 pl-4 text-gray-900 shadow-sm  ring-gray-400 placeholder:text-gray-400 focus:ring-indigo-600  " />
        <button 
        v-if="operation"
        type="submit"
        @click="reply(commentId)"
         class="h-10 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{operation}}</button>
        <button 
        v-else
        type="submit"
        @click="send"
         class="h-10 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SEND</button>
    </div>
</template>

<script setup>

const comment = defineModel()

const emit = defineEmits([
      "send",
      "reply",
      "replyto"
    ])

    function send(){
        emit("send", comment.value)
        comment.value = ""
    }
    function reply(id){
            emit("reply",["REPLY", comment.value, id])
        
    }
    

defineProps({
    users: {
        type: Object,
        default: () => {}
    },
    operation: {
        type: String,
        default: ""
    },
    updatedText: {
        type: String,
        default: ""
    },
    commentId: {
        type: Number,
        default: 0
    }

})

</script>
