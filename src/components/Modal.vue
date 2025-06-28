<template>
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div v-if="$slots.header" class="border-b px-4 py-3 font-bold text-lg text-gray-800">
                <slot name="header" />
            </div>
            <div class="p-4 text-gray-800 whitespace-pre-wrap break-words">
                <slot name="body" />
            </div>
            <div v-if="$slots.footer" class="border-t px-4 py-3 flex justify-end gap-2">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>
