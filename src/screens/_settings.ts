const themePreviewMap: Record<string, string> = {
    code_vibes: '/assets/images/themes/theme_version/codeVibes.png',
    gaming: '/assets/images/themes/theme_version/gaming.png',
    da_projects: '/assets/images/themes/theme_version/DAProjects.png',
    foods: '/assets/images/themes/theme_version/food.png',
};

export function initSettingsScreen(): void {
    document.querySelectorAll<HTMLInputElement>('input[name="theme"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const previewImg = document.getElementById('theme-preview-img') as HTMLImageElement;
            if (radio.checked && themePreviewMap[radio.value]) {
                previewImg.src = themePreviewMap[radio.value];
            }
        });
    });
}
