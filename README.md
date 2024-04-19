## fetch with tanstack-query strategy

- Authorization 요청
<<<<<<< Updated upstream
  - fetch `no-store` query `staleTime` 설정
=======
  fetch `no-store` query `staleTime` 설정
>>>>>>> Stashed changes

- mutate 요청

- props drilling 깊은 컴포넌트
<<<<<<< Updated upstream
  - API를 관리자에서 갱신 시켜 준다면? query `staleTime 0` fetch `force-cache + tags`
  - 관리자에서 갱신 시켜주지 않는다면? fetch `revalidate` query `staleTime` 동기화

- https://tanstack.com/query/v5/docs/framework/react/guides/advanced-ssr#data-ownership-and-revalidation
![alt text](<스크린샷 2024-04-19 오후 4.11.39.png>)
=======
  API를 관리자에서 갱신 시켜 준다면? query `staleTime 0` fetch `force-cache + tags`
  관리자에서 갱신 시켜주지 않는다면? fetch `revalidate` query `staleTime` 동기화
>>>>>>> Stashed changes
