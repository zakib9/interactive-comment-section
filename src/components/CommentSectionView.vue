<template>
    <div class="flex flex-col">
        <div class="w-full flex gap-4 bg-white rounded-lg p-4 mt-4 mb-2">
            <div class="flex flex-col justify-between gap-2 h-2/3 text-center bg-secondary text-primary p-2 rounded-md font-bold">
                <p>+</p>
                <p>{{ comment.score }}</p>
                <p>-</p>
            </div>
            <div>
                <div class="flex flex-col whitespace-normal">
                    <div class="flex justify-between">
                        <div class="flex items-center gap-4">
                            <img v-show="comment.user.username === 'amyrobson'" class="h-10 w-10"
                            src="..\assets\images\avatars\image-amyrobson.png" alt="">
                            <img v-show="comment.user.username === 'maxblagun'" class="h-10 w-10"
                            src="..\assets\images\avatars\image-maxblagun.png" alt="">
                            <img v-show="comment.user.username === 'ramsesmiron'" class="h-10 w-10"
                            src="..\assets\images\avatars\image-ramsesmiron.png" alt="">
                            <img v-show="comment.user.username === 'juliusomo'" class="h-10 w-10"
                            src="..\assets\images\avatars\image-juliusomo.png" alt="">
                            
                            <p class="font-bold">{{ comment.user.username }} <span class="pl-4 text-gray-400">{{comment.createdAt}}</span></p>
                        </div>
                        <div class="flex gap-1 items-center">
                            <svg
                            width="14"
                            height="13"
                            xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                            <button class="text-primary font-bold">Reply</button>
                        </div>
                    </div>
                            <p class="py-4">{{comment.content}}</p>
        
        
                </div>
        
            </div>
            </div>
            
            <div v-if="comment.replies.length != 0">
                <div v-for="reply in comment.replies" :key="reply.id">
                    <ReplaySectionView :reply="reply" :username="comment.user.username"/>
                </div >
            </div>
    </div>
        
</template>

<script setup>
import ReplaySectionView from './ReplaySectionView.vue';
defineProps({
    comment: {
        type: Object,
        default: () => {}
    }
})

</script>

