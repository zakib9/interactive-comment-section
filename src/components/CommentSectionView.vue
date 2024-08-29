<template>
    <div class="flex flex-col">
        <div class="flex sm:flex-col-reverse md:flex-row gap-4 bg-white rounded-lg p-4 mt-4 mb-2">
            <div class="flex justify-between">
                <div class="flex flex-col mb-10 sm:mb-0 sm:gap-6 sm:flex-row md:flex-col md:gap-0 justify-between  text-center bg-secondary text-primary p-2 rounded-md font-bold md:mb-10">
                    <p 
                    @click="scoreIncrementation" 
                    class="cursor-pointer">+</p>
                    <p>{{ comment.score }}</p>
                    <p 
                    @click="scoreDecrementation" 
                    class="cursor-pointer">-</p>
                </div>
                <div 
                    v-if="comment.user.username !== 'juliusomo'" 
                    class="hidden sm:flex gap-1 items-center md:hidden">
                            <svg 
                                v-if="replyForm"
                                width="14"
                                height="13"
                                xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#A5B4FC"/></svg>
                                <svg 
                                v-else
                                width="14"
                                height="13"
                                xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                                <button 
                                    :disabled="replyForm" 
                                    @click="reply(comment.id)" 
                                    class="text-primary font-bold disabled:text-indigo-300">Reply</button>
                            </div>
                            <div 
                                v-else 
                                class="hidden sm:flex md:hidden gap-6 items-center">
                                <div class="flex gap-1 items-center">
                                    <svg 
                                    v-if="updateForm"
                                    width="12" 
                                    height="14" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" 
                                    fill="#F5BDC6"/>
                                </svg>
                                    <svg 
                                    v-else
                                    width="12" 
                                    height="14" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" 
                                    fill="#ED6368"/>
                                </svg>
                                    <button 
                                    :disabled="updateForm" 
                                    @click="onDelete(comment.id)" 
                                    class="text-[#ED6368] font-bold disabled:text-[#F5BDC6]">Delete</button>
                                </div>
                                <div class="flex gap-1 items-center">
                                    <svg 
                                    v-if="updateForm"
                                    width="14" 
                                    height="14" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#A5B4FC"/>
                                    </svg>
                                    <svg 
                                    v-else
                                    width="14" 
                                    height="14" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/>
                                    </svg>
                                    <button 
                                    :disabled="updateForm" 
                                    @click="update(comment.content)" class="text-primary font-bold disabled:text-indigo-300">Edit</button>
                                </div>
                            </div>
            </div>
            <div class="w-full">
                <div class="flex flex-col whitespace-normal">
                    <div class="flex justify-between">
                        <div class="flex items-center gap-4">
                            <img 
                            v-show="comment.user.username === 'amyrobson'" class="h-10 w-10"
                            src="..\assets\images\avatars\image-amyrobson.png" alt="">
                            <img 
                            v-show="comment.user.username === 'maxblagun'" class="h-10 w-10"
                            src="..\assets\images\avatars\image-maxblagun.png" alt="">
                            <img 
                            v-show="comment.user.username === 'ramsesmiron'" class="h-10 w-10"
                            src="..\assets\images\avatars\image-ramsesmiron.png" alt="">
                            <img 
                            v-show="comment.user.username === 'juliusomo'" class="h-10 w-10"
                            src="..\assets\images\avatars\image-juliusomo.png" alt="">
                            
                            <div class="flex justify-evenly items-center gap-4">
                                    <p class="font-bold">{{ comment.user.username }}</p>
                                    <div 
                                    v-show="comment.user.username === 'juliusomo'" class="bg-primary text-white text-sm rounded-sm px-2 pb-1">you</div>
                                    <span class="pl-2 text-gray-400 font-bold">{{comment.createdAt}}</span>
                                </div>
                        </div>
                        <div 
                            v-if="comment.user.username !== 'juliusomo'" class="flex sm:hidden gap-1 items-center md:flex">
                            <svg 
                                v-if="replyForm"
                                width="14"
                                height="13"
                                xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#A5B4FC"/></svg>
                                <svg 
                                v-else
                                width="14"
                                height="13"
                                xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                                <button 
                                :disabled="replyForm" 
                                @click="reply(comment.id)" 
                                class="text-primary font-bold disabled:text-indigo-300">Reply</button>
                            </div>
                            <div 
                                v-else 
                                class="flex sm:hidden md:flex gap-6 items-center">
                                <div class="flex gap-1 items-center">
                                    <svg 
                                    v-if="updateForm"
                                    width="12" 
                                    height="14" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" 
                                    fill="#F5BDC6"/>
                                </svg>
                                    <svg 
                                    v-else
                                    width="12" 
                                    height="14" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" 
                                    fill="#ED6368"/>
                                </svg>
                                    <button 
                                    :disabled="updateForm" 
                                    @click="onDelete(comment.id)" 
                                    class="text-[#ED6368] font-bold disabled:text-[#F5BDC6]">Delete</button>
                                </div>
                                <div class="flex gap-1 items-center">
                                    <svg 
                                    v-if="updateForm"
                                    width="14" 
                                    height="14" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#A5B4FC"/>
                                    </svg>
                                    <svg 
                                    v-else
                                    width="14" 
                                    height="14" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/>
                                    </svg>
                                    <button 
                                    :disabled="updateForm" 
                                    @click="update(comment.content)" class="text-primary font-bold disabled:text-indigo-300">Edit</button>
                                </div>
                            </div>
                    </div>
                            <div class="">
                                <p 
                                v-if="!updateForm" 
                                class="py-4 ">{{comment.content}}</p>
                                <textarea v-else
                                    v-model="updatedText" 
                                    class="min-w-[675px] min-h-32 resize-none rounded-lg border border-solid py-1.5 my-4 pl-4 text-gray-900 shadow-sm  ring-gray-400 placeholder:text-gray-400 focus:ring-indigo-600  " />
                                </div>
                                <button 
                                v-if="updateForm"
                                type="submit"
                                @click="onUpdate(comment.id)"
                                class="h-10 max-w-min self-end rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{operation}}</button>
                </div>
        
            </div>
            </div>
            
            <div v-if="comment.replies.length != 0">
                <div 
                v-for="reply in comment.replies" 
                    :key="reply.id">
                    <ReplaySectionView 
                    :reply="reply"
                    :commentId ="comment.id" 
                    :username="comment.user.username"
                     @delete="OnDelete"
                     @reply="onReply"
                     @update="OnUpdate"
                     @replyScoreIncrementation="onReplyScoreIncrementation(reply.id, comment.id)"
                     @replyScoreDecrementation="onReplyScoreDecrementation(reply.id, comment.id)"/>
                </div >
            </div>
            <div 
            v-if="replyForm && comment.replies.length != 0" 
            class="flex" >
            <div class="min-w-0.5 min-h-10 bg-gray-200 ml-8"></div>
                <div class="ml-8 w-full">
                    <FormSectionView 
                    @reply="OnReply" 
                    :operation="operation"
                    :commentId ="comment.id"/>
                </div>
            </div>
            <div v-if="replyForm && comment.replies.length == 0" class="flex" >
            
                <div class=" w-full">
                    <FormSectionView 
                    @reply="OnReply" 
                    :operation="operation"
                    :commentId ="comment.id"/>
                </div>
            </div>
    </div>
        
</template>

<script setup>
import ReplaySectionView from './ReplaySectionView.vue';
import FormSectionView from '@/components/FormSectionView.vue';
import { ref } from 'vue';

let operation = ref("REPLY")
let replyForm = ref(false)
let updateForm = ref(false)
let updatedText = defineModel()


const emit = defineEmits([
      "delete",
      "deleteReply",
      "reply",
      "replyto",
      "update",
      "updateReply",
      "scoreIncrementation",
      "scoreDecrementation",
      "replyScoreIncrementation",
      "replyScoreDecrementation"
    ])

defineProps({
    comment: {
        type: Object,
        default: () => {}
    }
})




function reply(){
    replyForm.value =  !replyForm.value

}
function OnReply(operation){
        emit("reply", operation) 
    replyForm.value =  !replyForm.value
}
function onReply(operation){
    emit("replyto", operation)
    
}
function update(content){
    updatedText.value = content
    operation.value = "UPDATE"
    updateForm.value =  !updateForm.value
}
function onUpdate(id){
    emit("update", [operation.value, updatedText.value, id])
   
    updateForm.value =  !updateForm.value
}
function OnUpdate(updatedReply){
    emit("updateReply", updatedReply)
}
function onDelete(id){
    emit("delete",id)
}
function OnDelete(id){
    emit("deleteReply",id)
}
function scoreIncrementation(){
    emit("scoreIncrementation")
}
function scoreDecrementation(){
    emit("scoreDecrementation")
}
function onReplyScoreIncrementation(id, commentId){
    emit("replyScoreIncrementation", [id, commentId])
}
function onReplyScoreDecrementation(id, commentId){
    emit("replyScoreDecrementation", [id, commentId])
}


</script>

