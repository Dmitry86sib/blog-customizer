import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface Props {
	isOpen: boolean;
	onToggle: () => void;
	setPageState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	setPageState,
}: Props) => {
	const [formState, setFormState] = useState(defaultArticleState);

	// Создаём реф для сайдбара
	const asideRef = useRef<HTMLDivElement | null>(null);

	// Подписываемся на клики по документу
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!isOpen) return;
			if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
				onToggle(); // закрываем
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, onToggle]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setPageState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setPageState(defaultArticleState);
	};

	return (
		<div ref={asideRef}>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<div className={styles.field}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) =>
								setFormState((prev) => ({
									...prev,
									fontFamilyOption: option,
								}))
							}
						/>
					</div>

					<div className={styles.field}>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) =>
								setFormState((prev) => ({
									...prev,
									fontSizeOption: option,
								}))
							}
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='Цвет текста'
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) =>
								setFormState((prev) => ({
									...prev,
									fontColor: option,
								}))
							}
						/>
					</div>

					<Separator />

					<div className={styles.field}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(option) =>
								setFormState((prev) => ({
									...prev,
									backgroundColor: option,
								}))
							}
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(option) =>
								setFormState((prev) => ({
									...prev,
									contentWidth: option,
								}))
							}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
