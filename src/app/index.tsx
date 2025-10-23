import clsx from 'clsx'; // ✅ добавь импорт
import { useState, CSSProperties } from 'react';
import { Article } from '../components/article/Article';
import { ArticleParamsForm } from '../components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../constants/articleProps';
import styles from '../styles/index.module.scss';
import '../styles/index.scss';

export const App = () => {
	const [pageState, setPageState] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setPageState={setPageState} initialState={pageState} />
			<Article />
		</main>
	);
};
