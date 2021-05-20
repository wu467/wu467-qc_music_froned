<template>
    <section>
        <!-- 是否登录 -->
        <InformationCard/>

        <!-- 歌词显示 -->
        <PlayCard/>
        
    </section>
</template>

<script>
import InformationCard from '@/views/sidebar/Information'
import PlayCard from '@/views/sidebar/play'


export default ({
    name: 'LeftSidebar',
    components: { InformationCard, PlayCard}
    })
</script>
