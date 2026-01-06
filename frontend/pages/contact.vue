<template>
  <SectionLayout
    title="Contactez-nous."
    subtitle="Une idée, un projet, une question ? Nous sommes à votre écoute. Remplissez le formulaire ci-dessous ou contactez-nous directement."
    padding="lg"
  >
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
      <ContactForm />
      
      <Card padding="md">
        <Heading :level="3" color="white" class="mb-4">Nos coordonnées</Heading>
        <div class="mt-4 space-y-4 text-gray-300">
          <div class="flex items-center">
            <Icon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" :size="24" class="text-[#FDD835] mr-3" />
            <Text>contact@castelagency.fr</Text>
          </div>
          <div class="flex items-center">
            <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" :size="24" class="text-[#FDD835] mr-3" />
            <Text>+33 6 12 34 56 78</Text>
          </div>
          <div class="flex items-start">
            <Icon path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" :size="24" class="text-[#FDD835] mr-3 flex-shrink-0 mt-1" />
            <Text>
              84000 Avignon, France<br>
              <Text size="sm" color="tertiary">(Rendez-vous sur demande)</Text>
            </Text>
          </div>
        </div>
      </Card>
    </div>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '~/components/templates/SectionLayout/SectionLayout.vue'
import ContactForm from '~/components/organisms/ContactForm/ContactForm.vue'
import Card from '~/components/molecules/Card/Card.vue'
import Heading from '~/components/atoms/Typography/Heading.vue'
import Text from '~/components/atoms/Typography/Text.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
</script>
