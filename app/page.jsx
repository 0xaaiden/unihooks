import matter from 'gray-matter'
import { join } from 'path'
import { promises as fs } from 'fs'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionGrid from '@component/CollectionGrid'

async function getComponents() {
  const componentsPath = join(process.cwd(), '/src/data/components')
  const categoriesPath = join(process.cwd(), '/src/data/categories')

  const categorySlugs = ['hooks']
  const componentSlugs = await fs.readdir(componentsPath)

  const componentsByCategory = await Promise.all(
    categorySlugs.map(async (categorySlug) => {
      const categoryPath = join(categoriesPath, `${categorySlug}.mdx`)
      const categoryItem = await fs.readFile(categoryPath, 'utf-8')

      const { data: categoryData } = matter(categoryItem)

      const componentItems = await Promise.all(
        componentSlugs
          .filter((componentSlug) => componentSlug.includes(categorySlug))
          .map(async (componentSlug) => {
            const componentPath = join(componentsPath, componentSlug)
            const componentItem = await fs.readFile(componentPath, 'utf-8')

            const { data: componentData } = matter(componentItem)

            const componentSlugFormatted = componentSlug.replace('.mdx', '')
            const componentSlugTrue = componentSlugFormatted.replace(
              `${componentData.category}-`,
              ''
            )
      const componentCount = componentData.components ? Object.values(componentData.components).length : 0;
            return {
              title: componentData.title,
              slug: componentSlugTrue,
              category: componentData.category,
              emoji: componentData.emoji,
              count: componentCount,
              tag: componentData.tag,
              id: componentSlugFormatted,
            }
          })
      )

      return {
        categoryTitle: categoryData.title,
        componentItems,
      }
    })
  )

  return componentsByCategory
}

export default async function Page() {
  const componentsByCategory = await getComponents()

  return (
    <>
      <HeroBanner
        title="Uniswap v4 Hooks"
        subtitle="Open Source Directory for Uniswap v4 Hooks"
      >
        A community-curated collection of hooks implementations for Uniswap v4 that can
        be used in your project. Each hook is self-contained and can be used
        independently.
      </HeroBanner>

      <Container classNames="pb-8 lg:pb-12">
        <ul className="space-y-8">
          {componentsByCategory.map(({ categoryTitle, componentItems }) => {
            return (
              <li className="space-y-4" key={categoryTitle}>
                {/* <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {categoryTitle}
                </h2> */}

                <CollectionGrid componentItems={componentItems} />
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}
