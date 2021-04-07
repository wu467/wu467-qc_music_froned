<template>
    <section>
        <!-- 是否登录 -->
        <InformationCard/>

        <!-- 每日歌词 -->
        <DailyLyricsCard/>

        <!-- 推广 -->
        <PromoteCard/>
        
    </section>
</template>

<script>
import InformationCard from '@/views/sidebar/Information'
import DailyLyricsCard from '@/views/sidebar/DailyLyrics'
import PromoteCard from '@/views/sidebar/Promote'


export default ({
    name: 'LeftSidebar',
    components: { InformationCard, DailyLyricsCard, PromoteCard}
    })
</script>
