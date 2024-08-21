<script setup>
import FormSectionView from '@/components/FormSectionView.vue';
import CommentSectionView from '@/components/CommentSectionView.vue';
import ReplaySectionView from '@/components/ReplaySectionView.vue';
</script>

<template>
<div class="w-full h-screen flex bg-secondary justify-center items-end">
  <div class="flex flex-col bg-secondary w-1/2 py-10">
    <CommentSectionView />
    <ReplaySectionView/>
    <ReplaySectionView/>
    <ReplaySectionView/>
    <FormSectionView />
  </div>
</div>
</template>
