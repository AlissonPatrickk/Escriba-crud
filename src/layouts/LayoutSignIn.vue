<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar style="text-align: center;">
                <q-toolbar-title>
                    Escriba
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
  
<script>
export default {
    name: 'LayoutSignIn',
}
</script>
  